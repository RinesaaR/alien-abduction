using Alien_Abduction.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;


namespace Alien_Abduction.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly IMongoCollection<Quiz> _QuizCollection;

        public QuizController(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _QuizCollection = database.GetCollection<Quiz>("Quiz");
        }
        [HttpPost]
        public Quiz Create(Quiz quiz)
        {
            _QuizCollection.InsertOne(quiz);
            return quiz;
        }

        [HttpGet]
        public IList<Quiz> Read() =>
            _QuizCollection.Find(qu => true).ToList();

        [HttpGet("{id}")]
        public Quiz Find(string id) =>
            _QuizCollection.Find(qu => qu.Id == id).SingleOrDefault();

        [HttpPut("{id}")]
        public void Update(Quiz quiz) =>
            _QuizCollection.ReplaceOne(qu => qu.Id == quiz.Id, quiz);

        [HttpDelete("{id}")]
        public void Delete(string id) =>
            _QuizCollection.DeleteOne(qu => qu.Id == id);
    }
}
