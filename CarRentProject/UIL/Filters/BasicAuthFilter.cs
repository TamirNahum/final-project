﻿using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using System.Web.Http.Results;
using BOL;
using BLL;

namespace UIL.Filters
{
    public class BasicAuthFilter : Attribute, IAuthenticationFilter
    {

        public bool AllowMultiple { get { return false; } }


        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)

        {
            var authHead = context.Request.Headers.Authorization;
            if (authHead != null && authHead.Scheme != null)
            {
                UserModel user = UserManager.SelectUserByUserNameAndPassword(authHead.Scheme, authHead.Parameter);
                if (user != null)
                {
                    if (user.UserRole == 3)
                    {
                        var claims = new List<Claim>() { new Claim(ClaimTypes.Name, "RegisterUser"),
                                                     new Claim(ClaimTypes.Role, "client") };
                        var id = new ClaimsIdentity(claims, "Token");
                        context.Principal = new ClaimsPrincipal(new[] { id });
                    }


                    else if (user.UserRole == 2)
                    {
                        var claims = new List<Claim>() { new Claim(ClaimTypes.Name, "RegisterUser"),
                                                     new Claim(ClaimTypes.Role, "worker") };
                        var id = new ClaimsIdentity(claims, "Token");
                        context.Principal = new ClaimsPrincipal(new[] { id });
                    }

                    else if (user.UserRole == 1)
                    {
                        var claims = new List<Claim>() { new Claim(ClaimTypes.Name, "RegisterUser"),
                                                     new Claim(ClaimTypes.Role, "admin") };
                        var id = new ClaimsIdentity(claims, "Token");
                        context.Principal = new ClaimsPrincipal(new[] { id });
                    }

                    else
                    {
                        context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                    }
                }
                else
                {
                    context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                }
            }
               

            return Task.FromResult(0);
        }


        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}