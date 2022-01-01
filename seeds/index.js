const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: ' Aliquam tincidunt quam nec ex imperdiet eleifend. Proin laoreet et turpis quis suscipit. Nunc congue augue id tellus pellentesque, in interdum dui ultrices. Morbi pharetra ultricies metus, sit amet scelerisque felis lobortis a. Duis mattis semper massa ac elementum. Donec vel ligula porttitor, feugiat tellus id, laoreet orci. Nunc a suscipit augue. Nunc non nibh a arcu tincidunt pulvinar. Morbi ultrices gravida ultricies. Nullam aliquam tristique hendrerit. Vestibulum tellus orci, lacinia ac libero eget, sollicitudin accumsan turpis. Mauris malesuada purus a purus ultrices lacinia. Cras mollis iaculis blandit. Aenean lacus dolor, laoreet sit amet tristique et, pharetra eget tellus. Morbi egestas, mi ac mollis dapibus, magna ipsum feugiat tortor, vitae porta mi ligula a sem. Aliquam eleifend dapibus nisi nec laoreet. Etiam faucibus purus id lobortis venenatis. Maecenas a nisl vestibulum, finibus augue eget, consectetur justo. Proin sagittis sem lectus, quis egestas nisl imperdiet sit amet. Aenean aliquet pellentesque lectus vitae facilisis. Pellentesque ut volutpat dolor. Sed consequat lacus felis, ut commodo purus interdum sodales. Donec ac tristique sem. Etiam porttitor condimentum augue, quis suscipit sem eleifend at. Nulla velit tellus, efficitur sit amet interdum sed, facilisis quis orci. In vitae eros in nulla tincidunt iaculis. Proin egestas malesuada lobortis.',
            price
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});