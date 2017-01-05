package ma.lnet.boncmd.service.impl;

import ma.lnet.boncmd.service.CommandeService;
import ma.lnet.boncmd.domain.Commande;
import ma.lnet.boncmd.repository.CommandeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Commande.
 */
@Service
@Transactional
public class CommandeServiceImpl implements CommandeService{

    private final Logger log = LoggerFactory.getLogger(CommandeServiceImpl.class);
    
    @Inject
    private CommandeRepository commandeRepository;

    /**
     * Save a commande.
     *
     * @param commande the entity to save
     * @return the persisted entity
     */
    public Commande save(Commande commande) {
        log.debug("Request to save Commande : {}", commande);
        Commande result = commandeRepository.save(commande);
        return result;
    }

    /**
     *  Get all the commandes.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Commande> findAll() {
        log.debug("Request to get all Commandes");
        List<Commande> result = commandeRepository.findAll();

        return result;
    }

    /**
     *  Get one commande by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Commande findOne(Long id) {
        log.debug("Request to get Commande : {}", id);
        Commande commande = commandeRepository.findOne(id);
        return commande;
    }

    /**
     *  Delete the  commande by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Commande : {}", id);
        commandeRepository.delete(id);
    }
}
