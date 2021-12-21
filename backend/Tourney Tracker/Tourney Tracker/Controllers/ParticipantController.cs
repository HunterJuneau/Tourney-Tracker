using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Tourney_Tracker.DataAccess;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        ParticipantRepository _repo;
        public ParticipantController(ParticipantRepository repo)
        {
            _repo = repo;
        }

        // Get Participants by LeagueId //
        [HttpGet("{leagueId}")]
        public IActionResult GetParticipantsByLeagueId(int leagueId)
        {
            var participants = _repo.SelectParticipantsByLeagueId(leagueId);

            if (participants == null)
            {
                return NotFound($"No Participants with the LeagueId of {leagueId} were found.");
            }

            return Ok(participants);
        }

        // Get Participants by GameId //
        [HttpGet("game/{gameId}")]
        public IActionResult GetParticipantsByGameId(int id)
        {
            var gameParticipants = _repo.SelectGameParticipantsByGameId(id);

            var participants = _repo.SelectParticipantsByGameParticipants(gameParticipants.ToList());

            if (participants == null)
            {
                return NotFound($"No League with the Id of {id} was found.");
            }

            return Ok(participants);
        }

        // Add Participants //
        [HttpPost]
        public IActionResult PostParticipant(Participant newParticipant)
        {
            return Ok(_repo.InsertParticipant(newParticipant));
        }

        // Delete Participant //
        [HttpDelete]
        public IActionResult DeleteParticipant(int id)
        {
            _repo.DeleteParticipantById(id);
            return Ok("You have successfully deleted this Participant from the Database.");
        }

        // Update Participant //
        [HttpPut]
        public IActionResult PutParticipant(int id, Participant participant)
        {
            var participantToUpdate = _repo.SelectParticipantById(id);

            if (participantToUpdate == null)
            {
                return NotFound($"The Participant associated with the Id of {id} could not be located ");
            }

            return Ok(_repo.UpdateParticipantById(id, participant));
        }
    }
}
