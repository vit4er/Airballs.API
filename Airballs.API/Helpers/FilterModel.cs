using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airballs.API.Helpers
{
	public class FilterModel
	{
		/// <summary>
		/// В качестве Property используется имя поля таблицы, в нашем случае свойство 'Name'
		/// объекта Airball
		/// </summary>
		public object Field { get; set; }
		public Condition Condition { get; set; }
	}

	public class Condition
	{
		/// <summary>
		/// MatchMode - условие фильтрации, в нашем случае принимает два значения: 'in','contains'
		/// Value - объект, зависящий от MatchMode: для 'in' это массив строк, для 'contains' строка
		/// </summary>
		public string MatchMode { get; set; }
		public string[] Value { get; set; }
	}
}
