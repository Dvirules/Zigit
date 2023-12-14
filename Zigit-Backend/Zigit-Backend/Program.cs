using Zigit_Backend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("localhostPolicy",
        policy =>
        {
            policy.WithOrigins("https://localhost:7173").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
        });
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<DbMock>(); // Listed a DB innstance to the app's services as a singleton.

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
