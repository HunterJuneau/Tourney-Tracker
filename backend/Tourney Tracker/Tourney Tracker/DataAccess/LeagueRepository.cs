using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.DataAccess
{
    public class LeagueRepository
    {
        readonly string _connectionString;
        public LeagueRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("TourneyTracker");
        }

        // Get User's Leagues //
        internal IEnumerable<League> SelectUserLeagues(string id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Leagues
                        WHERE OwnerId = @id";

            return db.Query<League>(sql, new { id });
        }

        // Get League by Id //
        internal League SelectLeagueById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Leagues
                        WHERE Id = @id";

            return db.QueryFirstOrDefault<League>(sql, new { id });
        }

        // Get Public Leagues //
        internal IEnumerable<League> SelectPublicLeagues()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Leagues
                        WHERE IsPrivate = 0";

            return db.Query<League>(sql);
        }

        // Calculate League Elo
        internal void CalculateLeagueElo(int leagueId)
        {
            using var db = new SqlConnection(_connectionString);

            League league = SelectLeagueById(leagueId);

            var sql1 = @"SELECT *
                        FROM Games
                        WHERE LeagueId = @leagueId
                        AND isFinal = 1
                        ORDER BY Date ASC";

            List<Game> games = (List<Game>)db.Query<Game>(sql1, new { leagueId });

            var sql2 = @"UPDATE Participants
                        SET Elo = @startingRating
                        OUTPUT inserted.*
                        WHERE LeagueId = @leagueId";

            db.Query<Participant>(sql2, new { startingRating = league.StartingRating, leagueId });

            var sql3 = @"SELECT Elo
                        FROM Participants
                        WHERE Id = @id";

            var sql4 = @"UPDATE Participants
                        SET Elo = @newRating
                        OUTPUT inserted.*
                        WHERE Id = @id";

            for (int i = 0; i < games.Count; i++)
            {
                var initialRating0 = db.QueryFirstOrDefault<int>(sql3, new { id = games[i].Participant0 });
                var initialRating1 = db.QueryFirstOrDefault<int>(sql3, new { id = games[i].Participant1 });

                var R0 = Math.Pow(10, initialRating0 / 4000);
                var R1 = Math.Pow(10, initialRating1 / 4000);

                var E0 = R0 / (R0 + R1);
                var E1 = R1 / (R0 + R1);

                var S0 = 0.5;
                var S1 = 0.5;
                if (games[i].Winner)
                {
                    S0 = 0; S1 = 1;
                } else
                {
                    S0 = 1; S1 = 0;
                }

                var finalRating0 = initialRating0 + 24 * (S0 - E0);
                var finalRating1 = initialRating1 + 24 * (S1 - E1);

                db.QueryFirstOrDefault<Participant>(sql4, new { newRating = finalRating0, id = games[i].Participant0 });
                db.QueryFirstOrDefault<Participant>(sql4, new { newRating = finalRating1, id = games[i].Participant1 });
            }
        }

        // Add New League //
        internal int InsertLeague(League newLeague)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO Leagues(OwnerId, Name, Description, IsPrivate, MinimumRating, StartingRating)
                        OUTPUT inserted.Id
                        VALUES (@OwnerId, @Name, @Description, @IsPrivate, @MinimumRating, @StartingRating)";

            return db.QueryFirstOrDefault<int>(sql, newLeague);
        }

        // Delete League by Id //
        internal void DeleteLeagueById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE
                        FROM Games
                        WHERE LeagueId = @id

                        DELETE
                        FROM Participants
                        WHERE LeagueId = @id

                        DELETE 
                        FROM Leagues
                        WHERE Id = @id";

            db.Execute(sql, new { id });
        }

        // Update League by Id //
        internal League UpdateLeagueById(int id, League league)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE Leagues
                        SET OwnerId = @ownerId, Name = @name, Description = @description, IsPrivate = @isPrivate, MinimumRating = @minimumRating, StartingRating = @startingRating,
                        OUTPUT inserted.*
                        WHERE Id = @id";
            league.Id = id;
            return db.QuerySingleOrDefault<League>(sql, league);
        }
    }
}
