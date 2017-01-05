package ma.lnet.boncmd.service.impl;

import ma.lnet.boncmd.service.CategorieService;
import ma.lnet.boncmd.domain.Categorie;
import ma.lnet.boncmd.repository.CategorieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Categorie.
 */
@Service
@Transactional
public class CategorieServiceImpl implements CategorieService{

    private final Logger log = LoggerFactory.getLogger(CategorieServiceImpl.class);
    
    @Inject
    private CategorieRepository categorieRepository;

    /**
     * Save a categorie.
     *
     * @param categorie the entity to save
     * @return the persisted entity
     */
    public Categorie save(Categorie categorie) {
        log.debug("Request to save Categorie : {}", categorie);
        Categorie result = categorieRepository.save(categorie);
        return result;
    }

    /**
     *  Get all the categories.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Categorie> findAll() {
        log.debug("Request to get all Categories");
        List<Categorie> result = categorieRepository.findAll();

        return result;
    }

    /**
     *  Get one categorie by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Categorie findOne(Long id) {
        log.debug("Request to get Categorie : {}", id);
        Categorie categorie = categorieRepository.findOne(id);
        return categorie;
    }

    /**
     *  Delete the  categorie by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Categorie : {}", id);
        categorieRepository.delete(id);
    }
}
