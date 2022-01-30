using System;

namespace Domain
{
    public class Quiz
    {
        public Guid Id { get; set; }
        public string QuizName { get; set; }
        public int Timer { get; set; }
        public string Owner { get; set; }

    }
}
