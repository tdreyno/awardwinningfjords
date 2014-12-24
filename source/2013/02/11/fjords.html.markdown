---
title: 'Fjords: A Simple Service for Sharing Static Websites'
blog_editor_id: 95
---

I'm very excited to announce my new project, [Fjords](http://fjords.cc).

[![Fjords](/images/monitor-goblins.png)](http://fjords.cc)

Fjords is a service that lets you upload your static websites to be hosted in the cloud.

### Use Case: Agency Environment

I happen to work [at an agency](http://weareinstrument.com). As we design and build projects, we constantly need to send our work-in-progress to our clients for their review. With Fjords, we can generate temporary sites for client review. It's easy:

	cd my-client-project && fjords push

In a few moments, I'm given a dynamic URL (such as http://a1a1a1a.fjords.cc) which I can send out for review. These sites last for 30-days by default, but can be marked as "permanent" if you're working on a long-term project.

### Use Case: Personal Projects, Microsites & Blogs

As I built Fjords, I began switching all my static sites to it for testing purposes. This blog has been running on Fjords for weeks! Octopress and Middleman are popular static blogging platforms which we've added dead-simple integration for.

With the `middleman-fjords` plugin, updating and deploying this blog is as easy as:

	middleman fjords --rebuild

Octopress & Jekyll are just as easy:

	rake fjords

## The Dreaded Command-line

As you can see above, all the examples are using the terminal. This makes sense as Middleman, Jekyll and Octopress users were our first target, **but fear not!**

Our next round of updates will feature a Mac OS X drag-and-drop application, Dropbox integration and the built-in support of some popular GUI tools for front-end developers.

We're growing the service slowly. No doubt the floodgates will really open when we make Fjords accessible to users unfamiliar with the terminal.

### Signing Up

Hopefully, this all sounds interesting to you. [If you want to run off and sign up right now, I'm not going to stop you](http://fjords.cc/). If not, let's talk price.

Fjords is **$6 per month** for unlimited "preview" sites. These are the 30-day (by default, but free to extend) domains hosted under `fjords.cc`. This plan also include **1 site using your own domain name**. For example, this site has pointed its `CNAME` record at Fjords, so it can use a custom domain name. Additional custom domain names are **$2 per site**.

This is a small service and we're going to grow safely and slowly, but we'd love to have you join us. I'm available for questions, bug reports and feature requests at [admin@fjords.cc](mailto:admin@fjords.cc).

### [Sign Up Now](http://fjords.cc)