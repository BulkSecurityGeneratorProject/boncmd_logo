package ma.lnet.boncmd.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.lnet.boncmd.domain.Categorie;
import ma.lnet.boncmd.service.CategorieService;
import ma.lnet.boncmd.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Categorie.
 */
@RestController
@RequestMapping("/api")
public class CategorieResource {

    private final Logger log = LoggerFactory.getLogger(CategorieResource.class);
        
    @Inject
    private CategorieService categorieService;

    /**
     * POST  /categories : Create a new categorie.
     *
     * @param categorie the categorie to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categorie, or with status 400 (Bad Request) if the categorie has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categories")
    @Timed
    public ResponseEntity<Categorie> createCategorie(@RequestBody Categorie categorie) throws URISyntaxException {
        log.debug("REST request to save Categorie : {}", categorie);
        if (categorie.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("categorie", "idexists", "A new categorie cannot already have an ID")).body(null);
        }
        Categorie result = categorieService.save(categorie);
        return ResponseEntity.created(new URI("/api/categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("categorie", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categories : Updates an existing categorie.
     *
     * @param categorie the categorie to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categorie,
     * or with status 400 (Bad Request) if the categorie is not valid,
     * or with status 500 (Internal Server Error) if the categorie couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categories")
    @Timed
    public ResponseEntity<Categorie> updateCategorie(@RequestBody Categorie categorie) throws URISyntaxException {
        log.debug("REST request to update Categorie : {}", categorie);
        if (categorie.getId() == null) {
            return createCategorie(categorie);
        }
        Categorie result = categorieService.save(categorie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("categorie", categorie.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categories : get all the categories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categories in body
     */
    @GetMapping("/categories")
    @Timed
    public List<Categorie> getAllCategories() {
        log.debug("REST request to get all Categories");
        return categorieService.findAll();
    }

    /**
     * GET  /categories/:id : get the "id" categorie.
     *
     * @param id the id of the categorie to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categorie, or with status 404 (Not Found)
     */
    @GetMapping("/categories/{id}")
    @Timed
    public ResponseEntity<Categorie> getCategorie(@PathVariable Long id) {
        log.debug("REST request to get Categorie : {}", id);
        Categorie categorie = categorieService.findOne(id);
        return Optional.ofNullable(categorie)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /categories/:id : delete the "id" categorie.
     *
     * @param id the id of the categorie to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        log.debug("REST request to delete Categorie : {}", id);
        categorieService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("categorie", id.toString())).build();
    }

}
