using Airballs.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airballs.API.Helpers
{
	public static class QueryableExtention
	{
		/// <summary>
		///  Постраничное считывание результата
		/// </summary>
		/// <typeparam name="T">Тип источника</typeparam>
		/// <param name="queryable">Источник</param>
		/// <param name="page">Стартовая строка, 0 - based</param>
		/// <param name="count">Число строк на странице</param>
		/// <returns></returns>

		public static IQueryable<T> Page<T>(this IQueryable<T> queryable,
			int page, int count)
		{
			return queryable.Skip(page)
				.Take(count);
		}
	}
}
