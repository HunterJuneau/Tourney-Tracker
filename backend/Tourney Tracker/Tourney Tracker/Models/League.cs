namespace Tourney_Tracker.Models
{
    public class League
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public bool IsPrivate { get; set; } = true;
        public int MinimumRating { get; set; } = 0;
        public int StartingRating { get; set; } = 1500;
    }
}
