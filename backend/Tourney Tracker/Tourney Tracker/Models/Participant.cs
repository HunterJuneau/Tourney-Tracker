using System.Collections.Generic;

namespace Tourney_Tracker.Models
{
    public class Participant
    {
        public int Id { get; set; }
        public int LeagueId { get; set; }
        public string Name { get; set; }
        public int Elo { get; set; }
    }
}
