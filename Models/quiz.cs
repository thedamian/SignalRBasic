using System;

namespace quiz.Models
{
    public class Quiz
    {
        public string Question;
        public string[] Answers;
        public int CorrectAnswerIndex =0;

        public Quiz (string _question, string[] _answers, int _correctAnswerIndex) {
           Question = _question;
           Answers = _answers;
           CorrectAnswerIndex = _correctAnswerIndex;
        }

    }


}