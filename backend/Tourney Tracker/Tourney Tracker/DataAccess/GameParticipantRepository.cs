using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
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

        // Get GameParticipants by Game Id //
        internal IEnumerable<GameParticipant> SelectGameParticipantsByGameId(string id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM GameParticipants
                        WHERE GameId = @id";

            return db.Query<GameParticipant>(sql, new { id });
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
        internal void DeleteGameParticipantById(string id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM GameParticipants
                        WHERE Id = @id";

            db.Execute(sql, new { id });
        }

        // Update Game by Id //
        internal bool UpdateGameById(int id, bool team)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE GameParticipants
                        SET Team = @team,
                        OUTPUT inserted.Team
                        WHERE Id = @id";

            return db.QuerySingleOrDefault<bool>(sql, new { id, team });
        }
    }
}
