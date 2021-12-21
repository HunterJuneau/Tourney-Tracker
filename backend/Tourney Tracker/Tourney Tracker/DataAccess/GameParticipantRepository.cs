using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Tourney_Tracker.Models;


namespace Tourney_Tracker.DataAccess
{
    public class GameParticipantRepository
    {
        readonly string _connectionString;
        public GameParticipantRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("TourneyTracker");
        }

        // Add New GameParticipant //
        internal void InsertGameParticipant(GameParticipant newGameParticipant)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO GameParticipants(GameId, ParticipantId, Team)
                        VALUES (@gameId, @participantId, @team)";

            db.Execute(sql, newGameParticipant);
        }

        // Delete GameParticipant by Id //
        internal void DeleteGameParticipantById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM GameParticipants
                        WHERE Id = @id";

            db.Execute(sql, new { id });
        }
    }
}
