library(shiny)
library(ggplot2)
library(plotly)
library(DT)
library(dplyr)
library(lubridate)

# Load the data from the CSV file
data <- read.csv("YokyoFile.csv", stringsAsFactors = FALSE)

# Count the occurrences of each country
countryCount <- table(data$Country)

# Create a data frame with country names and their corresponding count
countryData <- data.frame(country = names(countryCount), count = as.numeric(countryCount), stringsAsFactors = FALSE)


#

# Group the data by Country and RequestedPage, and calculate the count
grouped_data <- data %>%
  group_by(Country, RequestedPage) %>%
  summarize(Visits = n())

# Find the most visited page for each country
most_visited <- grouped_data %>%
  group_by(Country) %>%
  filter(Visits == max(Visits))%>%
  slice(1)  # Select only the first row if there are multiple equal highest views

# Find the least visited page for each country
least_visited <- grouped_data %>%
  group_by(Country) %>%
  filter(Visits == min(Visits))%>%
  slice(1)  # Select only the first row if there are multiple equal highest views

# Drop the last column
most_visited <- subset(most_visited, select = -ncol(most_visited))
least_visited <- subset(least_visited, select = -ncol(least_visited))

# Rename the column
most_visited <- rename(most_visited, Most_Viewed = RequestedPage)
least_visited <- rename(least_visited, Least_Viewed = RequestedPage)

# Perform the join operation
merged_df <- merge(most_visited, least_visited, by = "Country")



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
  ),
  
  # Table of country, most viewed page, and least viewed page
  fluidRow(
    column(
      width = 12,
      div(
        DTOutput("myTable"),
        style = "max-height: 400px; overflow-y: scroll;"
      )
    )
  )
)

# Define the server logic
server <- function(input, output) {
  
  # Most visited page bar chart
  output$most_visited_page_chart <- renderPlotly({
    most_visited_pages <- data %>%
      group_by(RequestedPage) %>%
      summarise(Visits = n()) %>%
      arrange(desc(Visits)) %>%
      head(20)
    
    plot_ly(data = most_visited_pages, x = ~Visits, y = ~RequestedPage, type = 'bar', orientation = 'h',
            marker = list(color = 'steelblue')) %>%
      layout(title = "Visits Per Page ", xaxis = list(title = "Visits"), yaxis = list(title = "Requested Page")) 
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
    ) %>%
      layout(
        title = "Map of Web Visits",  # Add your desired title here
        geo = list(showframe = FALSE, showcoastlines = TRUE)
      )
  })
  
  # Doughnut chart of PageResponse
  output$page_response_doughnut_chart <- renderPlotly({
    page_responses <- data %>%
      group_by(PageResponse) %>%
      summarise(Visits = n())
    
    plot_ly(data = page_responses, labels = ~PageResponse, values = ~Visits, type = 'pie',
            textposition = 'inside', hole = 0.4) %>%
      layout(title = "Status Codes") 
  })
  
  # Trend of views using the Date
  output$views_trend_chart <- renderPlotly({
    data$Date <- as.Date(data$Date, format = "%d-%m-%y")
    
    views_trend <- data %>%
      group_by(Date) %>%
      summarise(Visits = n())
    
    plot_ly(data = views_trend, x = ~Date, y = ~Visits, type = 'scatter', mode = 'lines',
            fill = 'tozeroy', line = list(color = 'steelblue')) %>%
      layout(title = "Trend of Views", xaxis = list(title = "Date"), yaxis = list(title = "Visits")) 
  })
  
  # Table of country, most viewed page, and least viewed page
  output$myTable <- renderDT({
    # Replace 'your_data' with your actual dataframe
    datatable(merged_df, options = list(scrollY = "400px", pageLength = 10))
  })
  
}

# Run the Shiny app
shinyApp(ui = ui, server = server)
