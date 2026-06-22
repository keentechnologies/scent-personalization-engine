import os
from openai import OpenAI
from sqlalchemy.orm import Session
from uuid import UUID

from app.services.llm.prompt_loader import PromptLoader
from app.services.llm.data_formatter import DataFormatter
from app.core.config import settings

class LLMRecommendationService:
    def __init__(self, db: Session):
        self.db = db
        api_key = settings.OPENAI_API_KEY or os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=api_key) if api_key else None
        self.model = settings.OPENAI_MODEL or "gpt-4o"

    def generate_recommendations(self, session_id: UUID, current_user) -> str:
        
        if not self.client or not self.client.api_key:
            raise ValueError(
                "OpenAI API key is not configured. "
                "Please set the OPENAI_API_KEY environment variable in your .env file."
            )

        # Load system prompt from txt file
        system_prompt = PromptLoader.load_system_prompt()

        # Format input data (raw scores JSON table)
        formatter = DataFormatter(self.db)
        input_json_str = formatter.format_all_data(session_id)

        # Create completion request messages
        messages = [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": (
                    "Here is the calculated JSON scores table for the session:\n\n"
                    f"{input_json_str}"
                )
            }
        ]

        # Call OpenAI Chat Completion
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7
        )

        recommendation_text = response.choices[0].message.content

        # Save/Update the final recommendation in the database
        from app.models.final_user_recommendation import FinalUserRecommendation
        
        rec_record = (
            self.db.query(FinalUserRecommendation)
            .filter(FinalUserRecommendation.session_id == session_id)
            .first()
        )
        if rec_record:
            rec_record.recommendations = recommendation_text
        else:
            rec_record = FinalUserRecommendation(
                session_id=session_id,
                recommendations=recommendation_text
            )
            self.db.add(rec_record)
            
        self.db.commit()

        return recommendation_text

