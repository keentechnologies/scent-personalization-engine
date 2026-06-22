import os

class PromptLoader:
    _cached_prompt = None

    @classmethod
    def load_system_prompt(cls, force_reload: bool = False) -> str:
        """
        Reads and returns the system prompt from system_prompt.txt.
        
        Args:
            force_reload: If True, bypasses the in-memory cache and re-reads the file.
        """
        if cls._cached_prompt is not None and not force_reload:
            return cls._cached_prompt
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        prompt_file_path = os.path.join(current_dir, "system_prompt.txt")
        
        if not os.path.exists(prompt_file_path):
            raise FileNotFoundError(f"System prompt file not found at: {prompt_file_path}")
            
        with open(prompt_file_path, "r", encoding="utf-8") as f:
            cls._cached_prompt = f.read()
            
        return cls._cached_prompt
