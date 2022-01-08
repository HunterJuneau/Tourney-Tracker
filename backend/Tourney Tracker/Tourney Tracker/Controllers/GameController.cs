using Microsoft.AspNetCore.Mvc;
using Tourney_Tracker.DataAccess;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        GameRepository _repo;
        public GameController(GameRepository repo)
        {
            _repo = repo;
        }

        // Get Games by LeagueId //
        [HttpGet("league/{leagueId}")]
        public IActionResult GetGamesByLeagueId(int leagueId)
        {
            var games = _repo.SelectGamesByLeagueId(leagueId);

            if (games == null)
            {
                return NotFound($"No Games with the LeagueId of {leagueId} were found.");
            }

            return Ok(games);
        }

        // Get Game by Id //
        [HttpGet("{id}")]
        public IActionResult GetGame(int id)
        {
            var game = _repo.SelectGameById(id);

            if (game == null)
            {
                return NotFound($"No Game with the Id of {id} was found.");
            }

            return Ok(game);
        }

        // Add Game //
        [HttpPost]
        public IActionResult PostGame(Game newGame)
        {
            return Ok(_repo.InsertGame(newGame));
        }

        // Delete Game //
        [HttpDelete("{id}")]
        public IActionResult DeleteGame(int id)
        {
            _repo.DeleteGameById(id);
            return Ok("You have successfully deleted this Game from the Database.");
        }

        // Update Game //
        [HttpPut]
        public IActionResult PutGame(int id, Game game)
        {
            var gameToUpdate = _repo.SelectGameById(id);

            if (gameToUpdate == null)
            {
                return NotFound($"The Game associated with the Id of {id} could not be located ");
            }

            return Ok(_repo.UpdateGameById(id, game));
        }
    }
}
