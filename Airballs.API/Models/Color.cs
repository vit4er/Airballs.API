using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Airballs.API.Models
{
	public class Color
	{
		[Key]
		public string Code { get; set; }
		public string Name { get; set; }
	}
}
