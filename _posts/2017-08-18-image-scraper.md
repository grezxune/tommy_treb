---
layout: post
title:  "Image Scraper Python App"
date:   2017-08-17 12:05:39 -0600
---

# Image Scraper & Getting Around Hotlinking

I recently started a project with a coworker of mine ([Ethan Frei!](http://www.ethanfrei.com)) while we were attending a conference. We started using the language Elixir to write it, which evolved into me implementing it in Python as he continued working in Elixir. The project was an image scraper - an app that made an HTTP request for a given URL and displayed only the images it found on that page to the user.

This was such a simple concept I didn't know how you could screw it up ... little did I know! There's this thing called [hotlinking](https://simple.wikipedia.org/wiki/Hotlinking) in the realm of the web, which *can* be used maliciously (not my intent). I knew about hotlinking, and had planned to utilize it, however I did not know about **hotlink protection**. This is what caused me issues, because I was using hotlinking to display the images found on the URL given to me by the user.

# What Is Hotlinking?

Hotlinking is when a client attempts to use a resource from another host other than itself. By this I mean if my web app tried to display images hosted on another website's server by just linking to it, this is a hotlink. Some sites really despise this, because when I display it on my web app like this, it is using their server's bandwidth to download it to my client.

# So, What Is Hotlink Protection?

Hotlink protection is a concept used by a company (or human, or sole web developer, whatever) when they don't want to provide free bandwidth for their resources (images, videos, etc.). Basically, hotlink protection prevents unauthorized access to these resources. Unfortunately, my web app is not authorized to access files for every website in existence (but, it really should have that access, let's be real here). This resulted in an HTTP 403 - Forbidden response for each image I was trying to display. Hmph ... now what?

# Getting Around Hotlink Protection

There are ways of telling the host that you're someone else, but not from the client (in an automated fashion). This can be done by setting the 'User-Agent' header in the HTTP request, something that cannot be done from the client side of things when the client is a web browser. If this request header is set, a request to a hotlink-protected resource can be completed successfully.

# My New Strategy

Now with all of this figured out, I had a road map to get where I needed to be. I still scraped the page as I was before, and held onto the URLs to the images. The difference is, now instead of just sending those to the client for hotlinking, I made an HTTP request for each one from my server, and saved them there. Once they were saved to my server, I could then serve them to my client with no issues, because I had a copy of them.

BINGO, this worked! I had successfully gotten around the hotlink protection issue! It took a while to figure out what was going on, but I was excited to see this strategy come to life and display all of the images in front of my face. There is still a problem though. Some sites worked before I stopped hotlinking every image, and now they don't! I'm still not quite sure why this happened, but I think it has something to do with the strategy those sites use to save their images.

# One More Feature!

In order to allow for these sites which stopped working with the download method, I decided to get the best of both worlds here. When I get the URL from the user, I check if the URL uses hotlink protection. I do this by making a request with no modified headers and see if I get an HTTP - 403 response. If I do, I know I need to use the downloading method to display the images. If I get an HTTP - 200 (success) response, I know I can just use hotlinking and avoid having to download every image to my server.

# Possible Future Feature...

I may, in the future, add a button to download all images returned from a given URL. This may not be used often, but I have had to run custom scripts to download every image from a site before, and this would satisfy that use case. If anyone feels like implementing it, feel free to make a pull request on the repo [here](https://github.com/grezxune/image-fetcher) and I'll gladly take a look and add it in!

# Closing remarks

I hope this was useful and I helped at least someone figure out what hotlinking was, and maybe even help someone get around hotlink protection as well! I have hosted the live site [here](http://www.image-fetcher.tommytreb.com) using what is called a "Dyno" from [Heroku](http://www.heroku.com).

Pretty cool, huh?