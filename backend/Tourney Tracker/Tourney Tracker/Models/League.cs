namespace Tourney_Tracker.Models
{
    public class League
    {
        public int Id { get; set; }
        public string OwnerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
        public int MinimumRating { get; set; }
        public int StartingRating { get; set; }
    }
}
