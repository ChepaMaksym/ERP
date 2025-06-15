using CRM.Services.Interface;
using CRM.Services;
using ERP.Server.Services.Interface;
using ERP.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var configuration = builder.Configuration;

var connectionString = configuration.GetConnectionString("DefaultConnection")
                       ?? throw new ArgumentNullException("Connection string 'DefaultConnection' is missing.");


builder.Services.AddControllers();


builder.Services.AddTransient<ISoilTypeService>(provider =>
    new SoilTypeService(connectionString));

builder.Services.AddTransient<IFieldService>(provider =>
    new FieldService(connectionString));

builder.Services.AddTransient<IPlotService>(provider =>
    new PlotService(connectionString));

builder.Services.AddTransient<IPotService>(provider =>
    new PotService(connectionString));

builder.Services.AddTransient<IPlantService>(provider =>
    new PlantService(connectionString));

builder.Services.AddTransient<IWateringService>(provider =>
    new WateringService(connectionString));

builder.Services.AddTransient<IHarvestService>(provider =>
    new HarvestService(connectionString));

builder.Services.AddTransient<IAgroAnalyticsService>(provider =>
    new AgroAnalyticsService(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "FRM API", Version = "v1" });
});

builder.Services.AddCors(op =>
{
    op.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:5173");
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});


var app = builder.Build();


app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FRM API v1");
    });
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();


app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
