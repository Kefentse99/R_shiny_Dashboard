# Install and load required packages
install.packages("caret")
install.packages("randomForest")
library(caret)
library(randomForest)


# Load the data from the CSV file
data <- read.csv("YokyoFile.csv", stringsAsFactors = FALSE)

# Select relevant columns
data <- data[, c("Country", "RequestedPage", "PageResponse")]

# Preprocess the data
preprocessed_data <- na.omit(data)  # Remove rows with missing values
preprocessed_data$PageRespose <- as.factor(preprocessed_data$PageResponse)  # Convert response variable to factor

# Split the data into training and testing datasets
set.seed(123)
train_indices <- createDataPartition(preprocessed_data$PageResponse, p = 0.7, list = FALSE)
train_data <- preprocessed_data[train_indices, ]
test_data <- preprocessed_data[-train_indices, ]

# Train the random forest model
model <- randomForest(PageResponse ~ Country + RequestedPage, data = train_data)

# Make predictions on the testing data
predictions <- predict(model, newdata = test_data)

# Evaluate the model
confusionMatrix(predictions, test_data$PageResponse)
