using Microsoft.AspNetCore.Mvc;
using Tourney_Tracker.DataAccess;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameParticipantController : ControllerBase
    {
        GameParticipantRepository _repo;
        public GameParticipantController(GameParticipantRepository repo)
        {
            _repo = repo;
        }

        // Add GameParticipant //
        [HttpPost]
        public IActionResult PostGameParticipant(GameParticipant newGameParticipant)
        {
            _repo.InsertGameParticipant(newGameParticipant);
            return Ok("You have successfully created the GameParticipant.");
        }

        // Delete GameParticipant by Id //
        [HttpDelete]
        public IActionResult DeleteGameParticipant(int gameParticipantId)
        {
            _repo.DeleteGameParticipantById(gameParticipantId);
            return Ok("You have successfully deleted this GameParticipant from the Database.");
        }
    }
}
