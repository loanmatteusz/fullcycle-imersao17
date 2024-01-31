package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/devfullcycle/imersao17/goapi/internal/database"
	"github.com/devfullcycle/imersao17/goapi/internal/service"
	"github.com/devfullcycle/imersao17/goapi/internal/web"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/imersao17")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDB)
	webCategoryHandler := web.NewWebCategoryHandler(categoryService)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(*productDB)
	webProductHandler := web.NewWebProductHandler(productService)

	c := chi.NewRouter()

	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)

	c.Get("/category/{id}", webCategoryHandler.GetCategory)
	c.Get("/category", webCategoryHandler.GetCategories)
	c.Post("/category", webCategoryHandler.CreateCategory)

	c.Get("/product/{id}", webProductHandler.GetProduct)
	c.Get("/product", webProductHandler.GetProducts)
	c.Get("/product/category/{categoryID}", webProductHandler.GetProductByCategoryId)
	c.Post("/product", webProductHandler.CreateProduct)

	fmt.Println("Server is running on port 8080!")
	http.ListenAndServe(":8080", c)
}
