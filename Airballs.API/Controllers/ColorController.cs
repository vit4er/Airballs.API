using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airballs.API.Data;
using Airballs.API.Models;

namespace Airballs.API.Controllers
{
    [Route("api/color")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ColorController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Color
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColors()
        {
            return await _context.Colors.ToListAsync();
        }

        // GET: api/Color/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(string id)
        {
            var color = await _context.Colors.FindAsync(id);

            if (color == null)
            {
                return NotFound();
            }

            return color;
        }

        // PUT: api/Color/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(string id, Color color)
        {
            if (id != color.Code)
            {
                return BadRequest();
            }

            _context.Entry(color).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Color
        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
            _context.Colors.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColor", new { id = color.Code }, color);
        }

        // DELETE: api/Color/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Color>> DeleteColor(string id)
        {
            var color = await _context.Colors.FindAsync("#" + id);
			bool inUse = _context.Airballs.Any(x => x.ColorCode == color.Code);
            if (color == null)
            {
                return NotFound();
            }
			
			if (inUse)
			{
				return BadRequest(@"Данный цвет используется!");
			}

            _context.Colors.Remove(color);
            await _context.SaveChangesAsync();

            return color;
        }

        private bool ColorExists(string id)
        {
            return _context.Colors.Any(e => e.Code == id);
        }
    }
}
