using FinancialMonitor.Api.Hubs;
using FinancialMonitor.Api.Services;
using Microsoft.AspNetCore.Builder;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddSignalR()
    .AddJsonProtocol(options =>
    {
        options.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddOpenApi();
builder.Services.AddSingleton<TransactionStore>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocal", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
builder.Services.AddSignalR();
var app = builder.Build();
app.UseCors("AllowLocal");
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
}

//app.UseHttpsRedirection();
app.MapControllers();

app.MapHub<TransactionHub>("/transactionHub");

app.Run();
