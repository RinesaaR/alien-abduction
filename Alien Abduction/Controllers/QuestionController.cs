using Alien_Abduction.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alien_Abduction.Controllers
{
    [Route("[controller]")]
public class QuestionController : ControllerBase
        
    {
        public IMongoCollection<Question> _QuestionCollection;
        public QuestionController(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase("AlienAbduction");
            _QuestionCollection = database.GetCollection<Question>("Question");
        }
        [HttpPost]
        public Question Create(Question question)
        {
            _QuestionCollection.InsertOne(question);
            return question;
        }
        [HttpGet]
        public IList<Question> Read() =>
            _QuestionCollection.Find(ques => true).ToList();

        [HttpGet("{id}")]
        public Question Find(string id) =>
            _QuestionCollection.Find(ques => ques.Id == id).SingleOrDefault();


        [HttpPut("{id}")]
        public void Update(Question question) =>
            _QuestionCollection.ReplaceOne(ques => ques.Id == question.Id, question);

        [HttpDelete]
        public void Delete(string id) =>
            _QuestionCollection.DeleteOne(ques => ques.Id == id);
    }
}

