1.10: unicafe step5

Let's continue refactoring the application. Extract the following two components:

- Button for defining the buttons used for submitting feedback
- Statistic for displaying a single statistic, e.g. the average score.

To be clear: the Statistic component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:
