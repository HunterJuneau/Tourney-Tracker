using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.DataAccess
{
    public class ParticipantRepository
    {
        readonly string _connectionString;
        public ParticipantRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("TourneyTracker");
        }

        // Get Participants by League Id //
        internal IEnumerable<Participant> SelectParticipantsByLeagueId(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Participants
                        WHERE LeagueId = @id";

            return db.Query<Participant>(sql, new { id });
        }

        // Get GameParticipants by Game Id //
        internal IEnumerable<GameParticipant> SelectGameParticipantsByGameId(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM GameParticipants
                        WHERE GameId = @id";

            return db.Query<GameParticipant>(sql, new { id });
        }

        // Get Participants by GameParticipants //
        internal ParticipantsDto SelectParticipantsByGameParticipants(List<GameParticipant> gameParticipants)
        {
            using var db = new SqlConnection(_connectionString);

            var team0 = new List<Participant>();
            var team1 = new List<Participant>();

            for (int i = 0; i < gameParticipants.Count; i++)
            {
                var sql = @"SELECT *
                            FROM Participants
                            WHERE Id = @id";

                var id = gameParticipants[i].ParticipantId;

                var result = db.QueryFirstOrDefault<Participant>(sql, new { id });

                if (gameParticipants[i].Team)
                { team1.Add(result); }
                else
                { team0.Add(result); }
            }

            ParticipantsDto participants = new ParticipantsDto
            {
                Team0 = team0,
                Team1 = team1
            };

            return participants;
        }

        // Get Participant by Id //
        internal Participant SelectParticipantById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Participants
                        WHERE Id = @id";


            return db.QueryFirstOrDefault<Participant>(sql, new { id });
        }

        // Get Elo by LeagueId //
        internal int SelectLeagueById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT StartingRating
                        FROM Leagues
                        WHERE Id = @id";

            return db.QueryFirstOrDefault<int>(sql, new { id });
        }

        // Add New Participant //
        internal int InsertParticipant(Participant newParticipant)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO Participants(LeagueId, Name, Elo)
                        OUTPUT inserted.Id
                        VALUES (@leagueId, @name, @elo)";

            return db.QueryFirstOrDefault<int>(sql, newParticipant);
        }

        // Delete Participant by Id //
        internal void DeleteParticipantById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM Participants
                        WHERE Id = @id";

            db.Execute(sql, new { id });
        }

        // Update Game by Id //
        internal Participant UpdateParticipantById(int id, Participant participant)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE Participants
                        SET Name = @name, Elo = @elo,
                        OUTPUT inserted.*
                        WHERE Id = @id";
            participant.Id = id;
            return db.QuerySingleOrDefault<Participant>(sql, participant);
        }
    }
}
