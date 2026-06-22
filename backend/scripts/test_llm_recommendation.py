import sys
import os
from uuid import UUID

# Adjust path to import from app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.db import SessionLocal
from app.models.user_session import UserSession
from app.models.user import User
from app.models.user_accord_score_table import UserAccordScoreTable
from app.services.llm.recommendation_service import LLMRecommendationService
from app.services.llm.data_formatter import DataFormatter

def main():
    db = SessionLocal()
    try:
        # Check if session ID was provided
        session_id = None
        if len(sys.argv) > 1:
            try:
                session_id = UUID(sys.argv[1])
                print(f"Using provided session ID: {session_id}")
            except ValueError:
                print(f"Invalid UUID: '{sys.argv[1]}'")
                sys.exit(1)
        else:
            # Query latest session from database
            latest_session = (
                db.query(UserSession)
                .order_by(UserSession.created_at.desc())
                .first()
            )
            if not latest_session:
                print("No sessions found in the database. Please complete a quiz first.")
                sys.exit(1)
            session_id = latest_session.id
            print(f"Using latest session ID: {session_id}")

        # Fetch session
        session = db.query(UserSession).filter(UserSession.id == session_id).first()
        if not session:
            print(f"Session {session_id} not found in user_sessions table.")
            sys.exit(1)

        # Fetch user
        user = db.query(User).filter(User.id == session.user_id).first()
        if not user:
            print(f"User for session {session_id} not found.")
            sys.exit(1)

        # Verify accord scores exist
        accord_scores_row = (
            db.query(UserAccordScoreTable)
            .filter(UserAccordScoreTable.session_id == session_id)
            .first()
        )
        if not accord_scores_row:
            print(
                f"No calculated scores found in user_accord_score_table "
                f"for session {session_id}. Please run calculations first."
            )
            sys.exit(1)

        print("\n--- Formatting Input Data ---")
        formatter = DataFormatter(db)
        input_data = formatter.format_all_data(session_id)
        print(input_data)
        print("-----------------------------\n")

        print("Calling OpenAI to generate recommendations...")
        service = LLMRecommendationService(db)
        recommendation = service.generate_recommendations(session_id, user)
        
        print("\n=== GENERATED RECOMMENDATION ===")
        print(recommendation)
        print("================================")

    finally:
        db.close()

if __name__ == "__main__":
    main()
