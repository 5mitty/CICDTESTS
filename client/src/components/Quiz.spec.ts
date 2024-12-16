import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './Quiz'; // Adjust the import path as necessary
import * as questionApi from '../services/questionApi'; // Adjust the import path as necessary

jest.mock('../services/questionApi'); // Mock the API service

describe('Quiz Component', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    (questionApi.getQuestions as jest.Mock).mockReset();
  });

  test('renders the Start Quiz button', () => {
    render(<Quiz />);
    const startButton = screen.getByRole('button', { name: /start quiz/i });
    expect(startButton).toBeInTheDocument();
  });

  test('starts the quiz and displays questions', async () => {
    // Mock the getQuestions function to return sample questions
    (questionApi.getQuestions as jest.Mock).mockResolvedValue([
      {
        question: 'What is 2 + 2?',
        answers: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
        ],
      },
    ]);

    render(<Quiz />);
    
    // Click the Start Quiz button
    const startButton = screen.getByRole('button', { name: /start quiz/i });
    fireEvent.click(startButton);

    // Wait for the question to appear
    const questionText = await screen.findByText(/what is 2 \+ 2\?/i);
    expect(questionText).toBeInTheDocument();
  });

  test('handles answering a question correctly', async () => {
    (questionApi.getQuestions as jest.Mock).mockResolvedValue([
      {
        question: 'What is 2 + 2?',
        answers: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
        ],
      },
    ]);

    render(<Quiz />);
    fireEvent.click(screen.getByRole('button', { name: /start quiz/i }));

    // Click the correct answer
    fireEvent.click(screen.getByRole('button', { name: '1' })); // Assuming the correct answer is the first button

    // Check that the score is updated
    const scoreText = await screen.findByText(/your score: 1\/1/i);
    expect(scoreText).toBeInTheDocument();
  });

  test('completes the quiz', async () => {
    (questionApi.getQuestions as jest.Mock).mockResolvedValue([
      {
        question: 'What is 2 + 2?',
        answers: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
        ],
      },
      {
        question: 'What is 3 + 3?',
        answers: [
          { text: '6', isCorrect: true },
          { text: '7', isCorrect: false },
        ],
      },
    ]);

    render(<Quiz />);
    fireEvent.click(screen.getByRole('button', { name: /start quiz/i }));

    // Answer the first question correctly
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    
    // Answer the second question correctly
    fireEvent.click(screen.getByRole('button', { name: '1' }));

    // Check that the quiz completion message is displayed
    const completionMessage = await screen.findByText(/quiz completed/i);
    expect(completionMessage).toBeInTheDocument();
  });
});