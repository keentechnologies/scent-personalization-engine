import os

class PromptLoader:
    _cached_prompts = {}

    @classmethod
    def load_system_prompt(cls, filename: str = "system_prompt.txt", force_reload: bool = False) -> str:
        """
        Reads and returns the system prompt from the specified file.
        
        Args:
            filename: The name of the prompt file to load.
            force_reload: If True, bypasses the in-memory cache and re-reads the file.
        """
        if filename in cls._cached_prompts and not force_reload:
            return cls._cached_prompts[filename]
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        prompt_file_path = os.path.join(current_dir, filename)
        
        if not os.path.exists(prompt_file_path):
            raise FileNotFoundError(f"System prompt file not found at: {prompt_file_path}")
            
        with open(prompt_file_path, "r", encoding="utf-8") as f:
            cls._cached_prompts[filename] = f.read()
            
        return cls._cached_prompts[filename]
