using System;

namespace Tourney_Tracker.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int LeagueId { get; set; }
        public DateTime Date { get; set; }
        public bool IsFinal { get; set; } = false;
        public bool Winner { get; set; }
    }
}
