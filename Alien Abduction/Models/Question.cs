using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alien_Abduction.Models
{
    public class Question
    {
        [BsonId]

        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string QuizId { get; set; }
        public string QuestionText{ get; set; }
        public string Answer { get; set; }
        public BsonArray Options { get; set; }
    }
}
