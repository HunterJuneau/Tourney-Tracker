using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.DataAccess
{
    public class UserRepository
    {
        readonly string _connectionString;
        public UserRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("TourneyTracker");
        }

        // Get User by Id //
        internal User SelectUserById(string id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT *
                        FROM Users
                        WHERE Id = @id";


            return db.QueryFirstOrDefault<User>(sql, new { id });
        }

        // Add New User //
        internal string InsertUser(User newUser)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO Users(Id, DisplayName, Email)
                        OUTPUT inserted.Id
                        VALUES (@Id, @DisplayName, @Email)";

            return db.QueryFirstOrDefault<string>(sql, newUser);
        }

        // Delete User by Id //
        internal void DeleteUserById(string id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM Users
                        WHERE Id = @id";

            db.Execute(sql, new { id });
        }

        // Update User by Id //
        internal User UpdateUserById(string id, User user)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE Users
                        SET DisplayName = @displayName,
	                    EMAIL = @email,
                        OUTPUT inserted.*
                        WHERE Id = @id";

            return db.QuerySingleOrDefault<User>(sql, user);
        }
    }
}
