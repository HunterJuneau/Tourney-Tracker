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

    public class ParticipantsDto
    {
        public List<Participant> Team0 { get; set; }
        public List<Participant> Team1 { get; set; }
    }
}
