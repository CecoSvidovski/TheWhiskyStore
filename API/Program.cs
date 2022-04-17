using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

using API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StoreDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => 
{
    c.SwaggerDoc("v1", new OpenApiInfo {
        Title = "API",
        Version = "v1"
    });
});
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

var app = builder.Build();
using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreDbContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem migrating data");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("corsapp");

app.UseAuthorization();

app.MapControllers();

app.Run();
