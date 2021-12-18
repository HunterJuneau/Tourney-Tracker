using Microsoft.AspNetCore.Mvc;
using Tourney_Tracker.DataAccess;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _repo;
        public UserController(UserRepository repo)
        {
            _repo = repo;
        }

        // Get User by Id //
        [HttpGet("{id}")]
        public IActionResult GetUser(string id)
        {
            var user = _repo.SelectUserById(id);

            if (user == null)
            {
                return NotFound($"No User with the Id of {id} was found.");
            }

            return Ok(user);
        }

        // Add User //
        [HttpPost]
        public IActionResult PostUser(User newUser)
        {
            if (string.IsNullOrEmpty(newUser.Id) || string.IsNullOrEmpty(newUser.DisplayName))
            {
                return BadRequest("Id and DisplayName are required fields.");
            }

            return Ok(_repo.InsertUser(newUser));
        }

        // Delete User by Id //
        [HttpDelete]
        public IActionResult DeleteUser(string userId)
        {
            _repo.DeleteUserById(userId);
            return Ok("You have successfully deleted this User from the Database.");
        }

        //Update User //
        [HttpPut("{id}")]
        public IActionResult PutUser(string id, User user)
        {
            var userToUpdate = _repo.SelectUserById(id);

            if (userToUpdate == null)
            {
                return NotFound($"The User associated with the Id of {id} could not be located ");
            }

            return Ok(_repo.UpdateUserById(id, user));
        }
    }
}
