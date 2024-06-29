from rest_framework import serializers
from .models import Game, Guess

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'word_to_guess', 'is_active', 'created_at']

class GuessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guess
        fields = ['id', 'game', 'guessed_word', 'is_correct', 'timestamp']
