using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
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
