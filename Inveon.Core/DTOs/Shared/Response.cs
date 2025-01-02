using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.Shared
{
    public class Response<T>
    {
        public T Data { get; set; }
        public int StatusCode { get; set; }
        public bool IsSuccessful { get; set; }
        public List<string> Errors { get; set; }


        public static Response<T> Success(T data, int statusCode = 200)
            => new Response<T> { Data = data, StatusCode = statusCode, IsSuccessful = true };
        public static Response<T> Success(int statusCode = 200)
            => new Response<T> { StatusCode = statusCode, IsSuccessful = true };

        public static Response<T> Fail(List<string> errors, int statusCode = 400)
            => new Response<T> { Errors = errors, StatusCode = statusCode, IsSuccessful = false };

        public static Response<T> Fail(string error, int statusCode = 400)
            => new Response<T> { Errors = new List<string> { error }, StatusCode = statusCode, IsSuccessful = false };
    }
}
