library(shiny)
library(ggplot2)
library(plotly)
library(DT)
library(rworldmap)
library(dplyr)
library(lubridate)

# Load the data from the CSV file
data <- read.csv("YokyoFile.csv", stringsAsFactors = FALSE)

# Count the occurrences of each country
countryCount <- table(data$Country)

# Create a data frame with country names and their corresponding count
countryData <- data.frame(country = names(countryCount), count = as.numeric(countryCount), stringsAsFactors = FALSE)

# Define the UI
ui <- fluidPage(
  div(
    titlePanel("Yokyo Fun Olympics Website Analytics"),
    style = "background-color: black; text-align: center; color: white; padding: 10px;"
  ),
  
  
  # Single pane divided into four sections
  fluidRow(
    column(width = 6,
           div(
             plotlyOutput("most_visited_page_chart"),
             style = "box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border: 2px solid #ddd; padding: 10px;"
           )
           
    ),
    column(width = 6,
           div(
             plotlyOutput("worldMap"),
             style = "box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border: 2px solid #ddd; padding: 10px;"
           )
           
    ),
    column(width = 6,
           div(
             plotlyOutput("page_response_doughnut_chart") ,
             style = "box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border: 2px solid #ddd; padding: 10px;"
           )
          
    ),
    column(width = 6,
           div(
            plotlyOutput("views_trend_chart") ,
            style = "box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border: 2px solid #ddd; padding: 10px;"
           )
           
    )
  )
)

# Define the server logic
server <- function(input, output) {
  
  # # Most visited page bar chart
  # Bar graph of top 10 visited pages
  output$most_visited_page_chart <- renderPlotly({
    most_visited_pages <- data %>%
      group_by(RequestedPage) %>%
      summarise(Visits = n()) %>%
      arrange(desc(Visits)) %>%
      head(20)
    
    plot_ly(data = most_visited_pages, x = ~Visits, y = ~RequestedPage, type = 'bar', orientation = 'h',
            marker = list(color = 'steelblue')) %>%
      layout(title = "Vs", xaxis = list(title = "Visits"), yaxis = list(title = "Requested Page"))%>% 
      config(displayModeBar = FALSE)
   
  })
  

  # Visits per country world maps
  
  output$worldMap <- renderPlotly({
    plot_ly(
      data = countryData,
      type = "choropleth",
      locations = ~country,
      locationmode = "country names",
      z = ~count,
      colorscale = "Viridis",
      text = ~paste("Country: ", country, "<br>Count: ", count),
      hoverinfo = "text"
    )%>%
      layout(
        title = "Map of Web Visits",  # Add your desired title here
        geo = list(showframe = FALSE, showcoastlines = TRUE)
      ) %>% 
      config(displayModeBar = FALSE)
  })

  # Doughnut chart of PageResponse
  output$page_response_doughnut_chart <- renderPlotly({
    page_responses <- data %>%
      group_by(PageResponse) %>%
      summarise(Visits = n())
    
    plot_ly(data = page_responses, labels = ~PageResponse, values = ~Visits, type = 'pie',
            textposition = 'inside', hole = 0.4) %>%
      layout(title = "Page Response Break Down")%>% 
      config(displayModeBar = FALSE)
  })
  
  # Trend of views using the Date
  output$views_trend_chart <- renderPlotly({
    data$Date <- as.Date(data$Date, format = "%d-%m-%y")
    
    views_trend <- data %>%
      group_by(Date) %>%
      summarise(Visits = n())
    
    plot_ly(data = views_trend, x = ~Date, y = ~Visits, type = 'scatter', mode = 'lines',
            fill = 'tozeroy', line = list(color = 'steelblue')) %>%
      layout(title = "Trend of Views", xaxis = list(title = "Date"), yaxis = list(title = "Visits"))%>% 
      config(displayModeBar = FALSE)
  })
  
}

# Run the Shiny app
shinyApp(ui = ui, server = server)
