using todo_list.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(n=>n.SerializerSettings.ReferenceLoopHandling= Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddDbContext<MyWorkspaceContext>(option=>option.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("todo_con")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
