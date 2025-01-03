using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Repository.Configurations.Seed
{
    public static class CourseSeed
    {
        public static void SeedCourses(this ModelBuilder builder)
        {
            builder.Entity<Course>().HasData(
                new Course
                {
                    Id = 1,
                    Name = "Complete Web Development Bootcamp",
                    Description =
                        "Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more. Perfect for beginners who want to become full-stack developers.",
                    Price = 199.99M,
                    Category = "Web Development"
                },
                new Course
                {
                    Id = 2,
                    Name = "Python Programming Masterclass",
                    Description =
                        "Master Python programming with this comprehensive course. Covers basic to advanced concepts including data structures, algorithms, OOP, and practical projects. Ideal for both beginners and intermediate programmers.",
                    Price = 149.99M,
                    Category = "Programming"
                },
                new Course
                {
                    Id = 3,
                    Name = "Mobile App Development with Flutter",
                    Description =
                        "Build cross-platform mobile applications using Flutter and Dart. Learn to create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
                    Price = 179.99M,
                    Category = "Mobile Development"
                },
                new Course
                {
                    Id = 4,
                    Name = "Data Science and Machine Learning",
                    Description =
                        "Comprehensive course on data science and machine learning using Python. Learn data analysis, visualization, statistical modeling, and implement various machine learning algorithms through hands-on projects.",
                    Price = 299.99M,
                    Category = "Data Science"
                },
                new Course
                {
                    Id = 5,
                    Name = "DevOps Engineering Professional",
                    Description =
                        "Master modern DevOps practices including CI/CD, container orchestration, cloud services, and infrastructure as code. Learn tools like Docker, Kubernetes, Jenkins, and AWS/Azure.",
                    Price = 249.99M,
                    Category = "DevOps"
                }
            );



        }
    }
}
