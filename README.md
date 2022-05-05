<h1 justify-content='center'>Slot booking system</h1>

This simple webapp is an excercise allowing to book a slot for a specific date and a specific duration.
The webapp suggest a list of available slot.
User can then select a slot and book it.

The webapp has been built using React as Frontend and integrating it with a Rails back-end via webpacker.

Please follow this readme to see how to get the project set up on your computer.

<h2>Ruby version</h2>
v3.0.3

<h2>Rails version</h2>
v6.1.5.1

<h2>Configuration</h2>

```bundle install```

To setup React
```rails webpacker:install:react```

To setup the time [Moment library](https://momentjs.com/)
```yarn add moment moment-range```

<h2>Database creation</h2>

```rails db:create```

<h2>Database initialization</h2>

```rails db:migrate```

<h2>Database population</h2>

```rails db:seed```

<h2>How to run the test suite</h2>

*Run on port 3000 (defaults 3000)*
```rails s```
