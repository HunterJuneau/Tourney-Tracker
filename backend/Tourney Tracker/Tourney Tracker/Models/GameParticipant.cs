namespace Tourney_Tracker.Models
{
    public class GameParticipant
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public int ParticipantId { get; set; }
        public bool Team { get; set; }
    }
}
