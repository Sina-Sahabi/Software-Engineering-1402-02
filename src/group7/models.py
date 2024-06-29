from django.db import models

class Game(models.Model):
    word_to_guess = models.CharField(max_length=5)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Game #{self.id} - {'Active' if self.is_active else 'Inactive'}"

class Guess(models.Model):
    game = models.ForeignKey(Game, related_name='guesses', on_delete=models.CASCADE)
    guessed_word = models.CharField(max_length=5)
    is_correct = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Guess '{self.guessed_word}' for Game #{self.game.id}"
