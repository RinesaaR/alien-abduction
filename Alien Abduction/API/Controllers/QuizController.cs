using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DatabaseLogic;

namespace API.Controllers
{
    public class QuizController : BaseApiController
    {
        private readonly DataContext context;

        public QuizController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Quiz>>> GetQuizzes()
        {
            return await this.context.Quizzes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(Guid id)
        {
            return await this.context.Quizzes.FindAsync(id);
        }
    }
}

