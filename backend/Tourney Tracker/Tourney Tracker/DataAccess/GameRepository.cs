using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.DataAccess
{
    public class GameRepository
    {
        readonly string _connectionString;
        public GameRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("TourneyTracker");
        }

        // Get Games by League Id //
        internal IEnumerable<Game> SelectGamesByLeagueId(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Games
                        WHERE LeagueId = @id";

            return db.Query<Game>(sql, new { id });
        }

        internal object SelectUserLeagues(object leagueId)
        {
            throw new System.NotImplementedException();
        }

        // Get Game by Id //
        internal Game SelectGameById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Games
                        WHERE Id = @id";


            return db.QueryFirstOrDefault<Game>(sql, new { id });
        }

        // Add New Game //
        internal int InsertGame(Game newGame)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO Games(LeagueId, Date, IsFinal, Winner, Participant0, Participant1)
                        OUTPUT inserted.Id
                        VALUES (@leagueId, @date, @isFinal, @winner, @participant0, @participant1)";

            return db.QueryFirstOrDefault<int>(sql, newGame);
        }

        // Delete Game by Id //
        internal void DeleteGameById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM Games
                        WHERE Id = @id";

            db.Execute(sql, new { id });
        }

        // Update Game by Id //
        internal Game UpdateGameById(int id, Game game)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE Games
                        SET Date = @date, IsFinal = @isFinal, Winner = @winner,
                        OUTPUT inserted.*
                        WHERE Id = @id";
            game.Id = id;
            return db.QuerySingleOrDefault<Game>(sql, game);
        }
    }
}
