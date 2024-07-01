# Learning Through Gaming

This project help people expand their vocabulary and learn English in more entertaining approach, GAMES.
We used django as the backend for this service. The backend is a REST API that is used by the frontend to access data and change them.

## Table of Contents
- [Installation](#installation)
- [Usage](#Usage)
  - [Wordle](#wordle)
  - [Hangman](#hangman)
- [Contribution](#contribution)
- [License](#license)
- [Contact Info](#contact-info)

## Installation

No need for extra requirements. Just make sure to be able to run "src/manager.py".
If you encounter any problem, contact the application owners.

## Usage

To run this app simply run the following command:

```bash
python manage.py runserver
```

Then open your browser and go to `http://localhost:8000/group7/`.

You will have to choos between 2 games:

### Wordle

Wordle is a word-guessing game where the player has to guess a hidden 5-letter word within 6 attempts. After each guess, the game provides feedback by highlighting:
- Green for letters that are correct and in the correct position.
- Yellow for letters that are correct but in the wrong position.
- Gray for letters that are not in the word at all.

The objective is to deduce the hidden word using these clues before running out of attempts.

### Hangman

Hangman is a classic word-guessing game where the player attempts to guess a hidden 5-letter word by suggesting letters one at a time. The player has a maximum of 6 incorrect guesses. For each incorrect guess, a part of a hangman figure is drawn. The game ends when the player either guesses the word correctly or makes 6 incorrect guesses, resulting in the complete hangman figure.

The objective is to figure out the hidden word before making 6 incorrect guesses.

## Contributing

Contributions are welcome! Please contact us for guidelines on how to contribute to this project.

## License

This project is free to use/copy/modify. Project is not guaranteed. Contact us for more details.

## Contact Info

- **Name:** Sina , Mahya
- **Email:** [Mahya](mailto:beheshtimahya11@gmail.com) , [Sina](mailto:sina.sahabi.2s@gmail.com)
- **Github:** @lostinherdreams , @Sina-Sahabi